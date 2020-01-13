<template>
  <div class="main">
    <div class="user-info-main" v-if="isHome || isPostDetail">
      <div class="info-container">
        <a href="/" title="前往 Wetoria 的主页">
          <img src="/portrait.jpg" />
        </a>
        <h1>{{ $site.title }}</h1>
        <hr class="divider" />
        <p>{{ $site.description }}</p>
        <hr class="divider divider--secondary" />
        <div class="navigation-wrapper">
          <div class="inside">
            <ul class="navigation-list">
              <li class="navigation-item">
                <a>博客</a>
              </li>
            </ul>
          </div>
          <div class="outside">
            <a :href="$site.themeConfig.github" target="_blank">
              <v-icon icon-class="v-github" />
            </a>
          </div>
        </div>
      </div>
      <div class="cover"></div>
    </div>
    <div class="post-container" v-if="isHome">
      <div class="post-list">
        <div class="post-item" v-for="page in $site.pages" :key="page.key">
          <h2 class="post-title">
            <a :href="page.regularPath">{{ page.title }}</a>
          </h2>
          <p class="post-excerpt" v-if="page.excerpt" v-html="page.excerpt"></p>
          <div class="post-meta">
            <time>{{ getDate(page.lastUpdated) }}</time>
             • 
            <span class="tags" v-if="shouldRenderTags(page)">
              于 
              <span class="tag" v-for="tag in page.frontmatter.tags">
                <a class="tag-link">{{tag}}</a>
              </span>
            </span>
            <a :href="page.regularPath" class="btn-continue">继续阅读</a>
          </div>
          <hr class="post-divider" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../public/iconfont/iconfont.js';
export default {
  mounted() {
    console.log(this.$router, this.$route, this.$page, this.$site);
    this.$site.pages.sort((a, b) => {
      const dateA = new Date(a.lastUpdated);
      const dateB = new Date(b.lastUpdated);
      return dateB.getTime() - dateA.getTime();
    });
  },
  computed: {
    isHome() {
      return this.$route.path === '/';
    },
    isPostDetail() {
      return this.$route.path.includes('posts');
    },
  },
  methods: {
    getDate(time) {
      const date = new Date(time);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    shouldRenderTags(page) {
      return page.frontmatter.tags && page.frontmatter.tags.length;
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '../public/iconfont/iconfont.css'
</style>
