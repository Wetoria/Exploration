## 前言

这篇文章主要是增对如下一个最简单的 Vue demo，来了解 Vue 如何实现通过数据来影响视图的变化。

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

## Vue 对象声明

在 `src/core/instance/index.js` 文件中，声明了 Vue 的构造函数，主要代码如下：

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

在我们执行 `new Vue` 时，实际上是调用如上构造函数，整个方法做了两件事，1.检验是否通过 `new` 调用，2.调用 `_init` 方法进行初始化。


在该文件中还有如下五个方法的调用，用于对 Vue 原型进行扩展，方法里大概做了什么见方法后的注释。其中 `initMixin`、`lifecycleMixin` 和 `renderMixin` 三个方法是在数据驱动这个流程中需要注意的。

```js
initMixin(Vue) // 挂载_init方法
stateMixin(Vue) // 挂载 $data/$props/$set/$delete/$watch等属性
eventsMixin(Vue) // 挂载 $on/$once/$off/$emit等方法
lifecycleMixin(Vue) // 挂载 _update/$forceUpdate/$destroy 等方法
renderMixin(Vue) // 挂载渲染相关的帮助函数，$nextTick/_render等方法
```

## `_init` 方法

在 `_init` 方法中，做了一些初始化操作，包括合并 `options` 参数、初始化生命周期、事件、`render` 函数等。因为整个 `state` 的初始化是在 `beforeCreate` 钩子之后执行的，这也是为什么 `data` 在 `beforeCreate` 钩子函数中不能获取，在 `created` 钩子函数中可以使用的原因。

```js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    vm._uid = uid++

    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }

    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm)
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```

在项目中传入 Vue 中的参数，一般都包括 `el: '#app'`这个参数，在整个 `_init` 方法最后，会基于这个 `el` 参数，去将生成的 DOM 挂载到 `el` 上。

## 挂载过程

### `$mount` 方法

我这里是参考黄轶大佬的技术揭秘，主要了解 Web 平台下的 `$mount` 过程，其代码如下。

```js
// 暂存 mount 方法
// 这个 mount 方法是实际上挂载 DOM 的过程
const mount = Vue.prototype.$mount

// 这个是 Web 环境下 mount 前的一些校验及预处理过程
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {

  // 这个 query 方法内部主要使用 document.querySelector 去获取元素
  // 方法内部判断了传入的 el 是否为字符串
  // 所以我们在使用过程中，传入的 el 可以是有效的选择器字符串
  // 或是直接传入 DOM 元素节点
  el = el && query(el)

  // 目标挂载节点不能是 html 或 body
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options

  // 这一段 if 是根据 template/el 编译成 render函数
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }

  // 实际挂载过程
  return mount.call(this, el, hydrating)
}
```

> ——黄轶 Vue.js 技术揭秘  
> 接下来的是很关键的逻辑 —— 如果没有定义 render 方法，则会把 el 或者 template 字符串转换成 render 方法。这里我们要牢记，在 Vue 2.0 版本中，所有 Vue 的组件的渲染最终都需要 render 方法，无论我们是用单文件 .vue 方式开发组件，还是写了 el 或者 template 属性，最终都会转换成 render 方法，那么这个过程是 Vue 的一个“在线编译”的过程，它是调用 compileToFunctions 方法实现的，编译过程我们之后会介绍。

因为是站在巨人的肩膀上去学习，所以整个 if 的逻辑可以暂时跳过，但是如果自己一点一点去挖掘的话，我感觉如果不是对整个流程有了一定的了解以后，是不可能说出黄轶大佬上面这段话的。也正是因为有了黄轶大佬的经验，所以才能直击目标的去了解。

### mount 方法

根据上面的代码找到 `mount` 的定义，可以知道，整个挂载过程，实际上是通过 `mountComponent` 方法实现，两个的代码如下。

**mount**

```js
export const inBrowser = typeof window !== 'undefined'

Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

**mountComponent**

```js
function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el

  callHook(vm, 'beforeMount')

  let updateComponent = () => {
    vm._update(vm._render(), hydrating)
  }

  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)

  hydrating = false

  if (vm.$vnode == null) {
    // 标记为已挂载
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```

在 `mountComponent` 方法中，我删去了对 `render` 方法的校验，以及性能开销相关部分的逻辑，消除了“干扰”代码以后，就可以看出，整个挂载过程的核心部分就是 `Watcher` 的初始化，根据 `Watcher` 的构造函数，在初始化完成以后，会调用 `updateComponent` 这个方法，整个流程也就走到了 `vm._update(vm._render(), hydrating)` 这里。

```js
// Watcher's constructor
constructor (
  vm: Component,
  expOrFn: string | Function,
  cb: Function,
  options?: ?Object,
  isRenderWatcher?: boolean
) {
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn
  }
  this.value = this.lazy ? undefined : this.get()
}

// Watcher's get
get () {
  let value
  const vm = this.vm
  value = this.getter.call(vm, vm);
  return value
}
```

### _render

删除多余的“杂音”以后的 `_render` 方法如下，其中 `vnode = render.call(vm._renderProxy, vm.$createElement)` 就是整段代码里主要的部分了。

```js
Vue.prototype._render = function (): VNode {
  const vm: Component = this
  const { render, _parentVnode } = vm.$options
  let vnode
  try {
    currentRenderingInstance = vm
    vnode = render.call(vm._renderProxy, vm.$createElement)
  } finally {
    // 在这里重置为 null，那应该在render过程中有用到这个
    currentRenderingInstance = null
  }

  // 这一段应该就是只能有一个根节点的校验过程
  if (Array.isArray(vnode) && vnode.length === 1) {
    vnode = vnode[0]
  }
  if (!(vnode instanceof VNode)) {
    if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
      warn(
        'Multiple root nodes returned from render function. Render function ' +
        'should return a single root node.',
        vm
      )
    }
    vnode = createEmptyVNode()
  }
  return vnode
}
```

`_renderProxy` 以及 `$createElement` 是在 `initProxy` 和 `initRender` 中添加的，前者指向 `vm`，而后者主要的逻辑是返回 VNode。

### VNode

> 其实 VNode 是对真实 DOM 的一种抽象描述，它的核心定义无非就几个关键属性，标签名、数据、子节点、键值等，其它属性都是用来扩展 VNode 的灵活性以及实现一些特殊 feature 的。

因为操作 js 对象的性能开销小于操作 DOM 的，所以采用 VNode 来描述一个 DOM 节点，也就是所谓的 Virtual DOM。

### _update

整个方法的核心部分在于 `__patch__` 方法。

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  const prevEl = vm.$el
  const prevVnode = vm._vnode
  const restoreActiveInstance = setActiveInstance(vm)
  vm._vnode = vnode
  if (!prevVnode) {
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  restoreActiveInstance()
  if (prevEl) {
    prevEl.__vue__ = null
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm
  }
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el
  }
}
```

### __patch__

整个 `__patch__` 方法，在确定了参数以后，主要是 `createElm` 方法的调用。

```js
function patch (oldVnode, vnode, hydrating, removeOnly) {
  if (isUndef(vnode)) {
    if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
    return
  }

  let isInitialPatch = false
  const insertedVnodeQueue = []

  if (isUndef(oldVnode)) {
    isInitialPatch = true
    createElm(vnode, insertedVnodeQueue)
  } else {
    // 用 nodeType 确认原生节点
    const isRealElement = isDef(oldVnode.nodeType)
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    } else {
      if (isRealElement) {
        oldVnode = emptyNodeAt(oldVnode)
      }
      const oldElm = oldVnode.elm
      const parentElm = nodeOps.parentNode(oldElm)
      createElm(
        vnode,
        insertedVnodeQueue,
        oldElm._leaveCb ? null : parentElm,
        nodeOps.nextSibling(oldElm)
      )
      if (isDef(vnode.parent)) {
        let ancestor = vnode.parent
        const patchable = isPatchable(vnode)

        while (ancestor) {
          for (let i = 0; i < cbs.destroy.length; ++i) {
            cbs.destroy[i](ancestor)
          }
          ancestor.elm = vnode.elm

          if (patchable) {
            for (let i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, ancestor)
            }
            const insert = ancestor.data.hook.insert
            if (insert.merged) {
              for (let i = 1; i < insert.fns.length; i++) {
                insert.fns[i]()
              }
            }
          } else {
            registerRef(ancestor)
          }
          ancestor = ancestor.parent
        }
      }
      if (isDef(parentElm)) {
        removeVnodes([oldVnode], 0, 0)
      } else if (isDef(oldVnode.tag)) {
        invokeDestroyHook(oldVnode)
      }
    }
  }
  invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
  return vnode.elm
}
```

### createElm

整个方法，主要根据传入的 VNode 生成对应 DOM 节点，然后插入到父节点中，而因为根节点是我们传入的 `#app` 所对应的 DOM 节点，插入到这个节点中后，生成的 DOM 就插入到整个 DOM 文档中了。

```js
function createElm (
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return
  }
  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    if (process.env.NODE_ENV !== 'production') {
      if (data && data.pre) {
        creatingElmInVPre++
      }
      if (isUnknownElement(vnode, creatingElmInVPre)) {
        warn(
          'Unknown custom element: <' + tag + '> - did you ' +
          'register the component correctly? For recursive components, ' +
          'make sure to provide the "name" option.',
          vnode.context
        )
      }
    }
    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode)

    // 这一段是 setStyleScope
    setScope(vnode)

    if (__WEEX__) {
      // 删除了 WEEX 平台下，相关的逻辑
    } else {
      // 创建子元素
      // 里面判断了一下 key 是否重复
      // 然后就是循环调用 createElm
      // 如果是单个子元素，还会在 vnode.elm 上调用 appendChild
      createChildren(vnode, children, insertedVnodeQueue)

      // 调用钩子
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue)
      }

      // 这里是插入到父元素中，到最后会插入到 HTML 文档中
      insert(parentElm, vnode.elm, refElm)
    }
    if (process.env.NODE_ENV !== 'production' && data && data.pre) {
      creatingElmInVPre--
    }
  } else if (isTrue(vnode.isComment)) { // 创建注释节点
    vnode.elm = nodeOps.createComment(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  } else { // 创建文本节点
    vnode.elm = nodeOps.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}
```

```js
function createChildren (vnode, children, insertedVnodeQueue) {
  if (Array.isArray(children)) {
    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(children)
    }
    for (let i = 0; i < children.length; ++i) {
      createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
    }
  } else if (isPrimitive(vnode.text)) {
    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
  }
}
```

```js
function insert (parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (nodeOps.parentNode(ref) === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}
```

看完到这里，没看到哪里调用了 `message` ，参考了黄轶的解释，应该是 `message` 属于子元素节点，所以最后根据最后一个 `else` 创建了 `TextNode`，但是什么时候赋值了 `text` 没有注意。如果要看的话，还得去关注 VNode 的创建过程。

## 总结

到这里，整个数据驱动部分的主要源码就看完了，中间还有很多细节没有关注到，比如：

- 模板的编译过程
- VNode 的创建过程
- `vnode.text` 是什么时候转换的
- 为什么最后是 `createTextNode`，因为 `data` 中的 `message` 就是一个纯字符串吗？如果是响应式的数据呢？

这些都是后面要了解的东西。