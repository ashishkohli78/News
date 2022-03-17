import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner';
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticals] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResult] = useState(0)
    
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {
        props.setProgress(15)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=12f6a6a7a08d4eaa851b23d282a25374&page=${page}&pagesize=${props.pagesize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(50)
        let parsedData = await data.json()
        console.log(parsedData)
        setArticals(parsedData.articles)
        setLoading(false)
        setTotalResult(parsedData.totalResults)
        props.setProgress(100)
    }
    
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)}- NewsAnytime`
        updateNews()
    }, [])

    const fetchMoreData = async () => {
        setPage(page+1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=12f6a6a7a08d4eaa851b23d282a25374&page=${this.state.page + 1}&pagesize=${props.pagesize}`
        
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticals(articles.concat(parsedData.articles))
        setTotalResult(parsedData.totalResults)
    


    }
    
    return (
        <div className='container my-10'>
            
            document.title = `${capitalizeFirstLetter(props.category)}- NewsAnytime`

            <h2 className='text-center my-5'>News Anytime - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='cointainer'>
                    <div className='row'>
                        {articles.map((element) => {

                            return <div className='col-md-4' key={element.url}>
                                <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>


        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
}

export default News
