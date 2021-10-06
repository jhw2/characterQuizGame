import axios from "axios"; 

const http = axios.create({
  baseURL: "/v1/search",
  headers: {
    "Content-type": "application/json",
    'X-Naver-Client-Id': "7YjfUGIH4DkzF4amO8qS",
    'X-Naver-Client-Secret': "gWWRmWsYOY"
  }
});

const searchPeople = (query = '연예인사진' ) =>{
    http.get(`/image`, {params: {query}}).then(res => {
        console.log(res)
    })
    return '';
}


export default searchPeople;