function mySqrt(x) {
    if(x < 0) return -1;
    if (x == 0) return 0;
    if (x < 4) return 1;
  
    for (let i = 0 ; i < Math.floor(x / 2) + 1; i++) {
    //   console.log("check" + i);
      if (i * i > x) {
        return i - 1;
      }
    }
    return -1;
    // your code here   
  }

  console.log(mySqrt(10000));