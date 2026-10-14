export function welcomeText(name,date=new Date()) {
 const hour=date.getHours();
 const greeting=hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
 return greeting+', '+name+'.';
}
