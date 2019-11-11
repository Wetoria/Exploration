import java.util.Scanner;
public class T{
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("请输入行数:");
    int row = sc.nextInt();
    System.out.print("请输入列数:");
    int col = sc.nextInt();
    char a = 'A';
    for (int i = 0; i < row; i++) {
      for (int j = 0; j < col; j++) {
        int wordIndex = Math.abs(j - (col / 2));
        if (wordIndex <= i) {
          System.out.print((char)(a+wordIndex));
        } else {
          System.out.print(" ");
        }
      }
      System.out.println();
    }
  }
}
