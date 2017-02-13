import java.io.*;
import java.util.*;
class timer
{
public static void main(String args[])
{
int mins=0;
int secs=0;
String args1=new String();
for(int i =65; i>=0 ; i--) { //Enter time in secs give extra five seconds
    try { PrintWriter  writer = new PrintWriter("time.txt","UTF-8");
        //sending the actual Thread of execution to sleep X milliseconds
        mins=(i/60);
        secs=(i%60);
   if(mins>9) args1=Integer.toString(mins);
   else args1="0"+Integer.toString(mins);
  if(secs>9) args1+=" "+Integer.toString(secs);
   else args1+=" 0"+Integer.toString(secs);
     writer.println(args1);writer.close();
     System.out.println(mins+" "+secs);
        Thread.sleep(1000);
    } catch(Exception e) {
        System.out.println("Exception : "+e.getMessage());
    }
}

/*Timer t = new Timer();
t.schedule(new TimerTask() {
    @Override
    public void run() {
          
    }
}, 0, 1000);*/
}
}
