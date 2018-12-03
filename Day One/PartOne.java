import java.util.Scanner;
import java.io.File;
import java.io.IOException;

class PartOne {
  public static void main (String [] args) throws IOException {
    Scanner file = new Scanner(new File("puzzleInput.txt"));
    
    int frequency = 0;
    
    
    while (file.hasNext()) {
      frequency += file.nextInt();
    }
    
    file.close(); // part one
    System.out.print("Current frequency: " + frequency);
    
    findRepeats(new int[] {0}, 0);
  }
  
  public static int[] expand(int[] input) {
    int[] newArray = new int[input.length + 1];
    for (int i = 0; i < input.length; i++) newArray[i] = input[i];
    return newArray;
  }
  
  public static void findRepeats(int[] repeated, int frequency) throws IOException { // part two
    int repeat = 0;
    boolean repeatFound = false;
    
    Scanner file = new Scanner(new File("puzzleInput.txt"));
    
    
    while (file.hasNext()) {
      frequency += file.nextInt();
      
      if (!repeatFound) {
        
        for (int i = 0; i < repeated.length; i++) {
          if (frequency == repeated[i]) {
            repeat = frequency;
            repeatFound = true;
          }
        }
        
        repeated = expand(repeated);
        repeated[repeated.length - 1] = frequency;
      }
    }
    
    file.close();
    
    if (!repeatFound) {
      findRepeats(repeated, frequency);
    } else System.out.println(", repeats at: " + repeat);
  }
}