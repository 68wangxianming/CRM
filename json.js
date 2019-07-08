const result = {
    data:{
        name:'xiaoming'
    }
};

let json2ts = require("json2ts");
const jsonContent = JSON.stringify(result);
let interface_Date = json2ts.convert(jsonContent);
console.log(interface_Date);
