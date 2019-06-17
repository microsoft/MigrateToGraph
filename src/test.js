let ejs = require('ejs');
let template =  require('../input/template.json');
console.log(template);
template = JSON.stringify(template).replace(new RegExp('"<%','g'),'<%').replace(new RegExp('%>"','g'),'%>');


console.log(ejs.render(template,{obj:{name:'abcy',id:121}},{escape:(str) => {
  console.log(str);
  return JSON.stringify(str);
}}));


