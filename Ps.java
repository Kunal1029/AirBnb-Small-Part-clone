import java.util.*;

public class Ps {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("enter the row and columns");
        int r1 = sc.nextInt();
        int c1 = sc.nextInt();
        int one[][] = new int[r1][c1];
        int two[][] = new int[r1][c1];

        for (int i = 0; i < one.length; i++) {
            for (int j = 0; j < one[i].length; j++) {
                System.out.println("row " + i + " col " + j);
                one[i][j] = sc.nextInt();
            }

        }
        sc.close();
    }
}