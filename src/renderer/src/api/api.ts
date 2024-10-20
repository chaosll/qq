import request from "./request";

export const list =(data)=> request.get('/posts',{params:data})
