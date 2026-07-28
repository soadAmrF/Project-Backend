const responseToFront = (status_code,message,data)=>{
    return{
        status_code,
        message,
        data,
    };
};

module.exports =responseToFront ;