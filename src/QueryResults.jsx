import "./QueryResults.css"
import "./SimilarQueryResults.css"
import "./Home.css"
import {Link, useParams} from "react-router-dom";
import {useEffect, useId, useState} from "react";
import {topics, topics_urls} from "./Topics.jsx";
import {distalgo} from "./damulenvensteih.js";
import Popup from "./Popup.jsx";

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
        let ranked = []
        for (let i = 0; i < topics.length; i++) {
            ranked.push([topics[i], distalgo(params.query, topics[i], true)])
        }
        ranked.sort(function(a, b){return a[1] - b[1]})
        sim_topics.push(ranked[0][0], ranked[1][0], ranked[2][0], ranked[3][0], ranked[4][0])
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
                        <span onClick={() => document.getElementById("popup").style.display = "block"}>Knowledge Density</span>
                    </li>
                    {
                        results?.urls?.map((value, index) => {
                            return <>
                                <a key={index} href={value} target="_blank">
                                    <li>
                                        <div>{results.titles[index]}</div>
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
            <Popup/>
        </>
    )
}