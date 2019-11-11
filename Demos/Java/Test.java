public class Test{
  public static void main(String[] args) {
    char[] words = {'A','B','C','D','E','F','G','H','I','J','K'};
    char[][] table = new char[11][21];
    for (int i = 0; i < table.length; i++) {
      for (int j = table[i].length / 2; j < table[i].length; j++) {
        int wordIndex = j - (table[i].length / 2);
        char temp = ' ';
        if (wordIndex <= i) {
          temp = words[wordIndex];
        }
        table[i][j] = temp;
        table[i][table[i].length - j - 1] = temp;
      }
    }

    for (int i = 0; i < table.length; i++) {
      for (int j = 0; j < table[i].length; j++) {
        System.out.print(table[i][j]);
      }
      System.out.println();
    }
  }
}
