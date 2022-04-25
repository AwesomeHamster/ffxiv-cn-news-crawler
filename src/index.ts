import  axios  from "axios";

export const categorys = new Map([
    ["all-news", "5309,5310,5311,5312,5313"],
    ["topics", "7186"],
    ["news", "5310"],
    ["official-events", "5311"],
    ["announcement", "5312"],
    ["unofficial-events", "5313"],
]);

export async function getNews(
    pageIndex:number = 0,
    pageSize: number = 1,
    category:string = "all-news"
){
    let datas = new Array()
    let result = await axios({
        method: "GET",
        url: `https://ff.web.sdo.com/inc/newdata.ashx?url=List?gameCode=ff&category=${categorys.get(
      category
    )}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
    }).catch((error)=>{
        console.log(error);
    })
    let data = result.data.Data
    data.forEach(item => {
        datas.push({
            id: item.Id,
            title: item.Title,
            url: item.Author,
            time: Date.parse(item.PublishDate),
            image: item.HomeImagePath,
            description: item.Summary,
        })
    });
    return datas;
}