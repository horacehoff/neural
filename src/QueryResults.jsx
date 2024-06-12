import "./QueryResults.css"
import "./SimilarQueryResults.css"
import "./Home.css"
import {Link, useParams} from "react-router-dom";
import {useEffect, useId, useState} from "react";
import {topics, topics_urls} from "./Topics.jsx";
import {distalgo} from "./damulenvensteih.js";

export default function QueryResults() {
    let params = useParams()
    const bg_id = useId()
    const title_id = useId()

    const [results, setResults] = useState({})

    useEffect(() => {
        document.getElementById(title_id).innerText = params.query

        setResults(topics_urls.filter(i => i.topic === params.query)[0])
    }, [params.query])

    if (!topics.includes(params.query)) {
        let sim_topics = []
        for (let i = 0; i < topics.length; i++) {
            if (distalgo(params.query, topics[i], true) < 13) {
                sim_topics.push(topics[i])
            }
            console.log(distalgo(params.query, topics[i], true)+topics[i])
        }
        return (
            <>
                <h1 id={title_id} className="similar-topic-title"></h1>
                <h2 className="similar-title">Similar topics ?</h2>
                <div className="similar-topics">
                    {
                        sim_topics.map((value, index) => {
                            return <>
                                <Link to={"/learn/"+value} key={index}>{value}</Link><span>-</span>
                            </>
                        })
                    }
                </div>
            </>
        )
    }
    return (
        <>
            <div className="bg" id={bg_id}>
                <h1 id={title_id} className="query-title">{params.query}</h1>
                <ul className="query-list">
                    <li className="query-list-count">
                        {results?.urls?.length} Learning resources
                        <span>Knowledge Density</span>
                    </li>
                    {
                        results?.urls?.map((value, index) => {
                            return <>
                                <a href={value} target="_blank">
                                    <li key={index}>
                                        {results.titles[index]}
                                        <br/>
                                        <a>{value}</a>
                                        <span>{results.densities[index]}%</span>
                                    </li>
                                </a>
                            </>
                        })
                    }
                </ul>
            </div>
        </>
    )
}