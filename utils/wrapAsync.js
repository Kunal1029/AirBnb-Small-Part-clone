module.exports = (fn) => {
  return (req, res, next)=> {
    fn(req, res, next).catch(next);
  };
};

//below r 4 understanding purpose

// function wrapAsync(fn){
//     return function(a,b){
//         sum(a,b);
//     }
// }

// const sum = ()=>{
//     return a+blur;
// }

// let k = wrapAsync(sum)
// console.log(typeof k)  // function
