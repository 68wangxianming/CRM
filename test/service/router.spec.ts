const axios = require("axios");

interface Iresponse {
    data:{
        name:string
    }
}

describe("node接口测试",()=>{
    it("测试接口",()=>{
        return axios.get('http://localhost:8080/data.php').then((response:Iresponse)=>{
            expect(response.data.name).toBe("xiaoming");
        })
    })
});
