import { useEffect, useState } from "react"
import { apiGet, apiPost } from "../utils/api"

const useFetch = ({ url, method = "GET", body }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    let responseData = {}
    const fetchApi = async () => {
      if (method === "GET") {
        responseData = await apiGet(url)
      } else {
        responseData = await apiPost(url, body)
      }
      setData(responseData)
    }
    fetchApi()
  }, [url])
  return data
}
export default useFetch