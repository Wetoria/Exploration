public class StringTest {
  public static void main(String... args) {
    String str = "str";
    test(str);
    System.out.println(str);
  }

  static void test(String str) {
    str+="s";
  }
}
