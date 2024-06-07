import "./QueryResults.css"
import "./SimilarQueryResults.css"
import "./Home.css"
import {Link, useParams} from "react-router-dom";
import {useEffect, useId} from "react";
import {topics} from "./Topics.jsx";
import {distalgo} from "./damulenvensteih.js";

export default function QueryResults() {
    let params = useParams()
    const bg_id = useId()
    const title_id = useId()

    useEffect(() => {
        document.getElementById(title_id).innerText = params.query
    }, [params.query])

    if (!topics.includes(params.query)) {
        // https://stackoverflow.com/a/36566052
        // eslint-disable-next-line no-inner-declarations
        function editDistance(s1, s2) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();

            let costs = [];
            for (let i = 0; i <= s1.length; i++) {
                let lastValue = i;
                for (let j = 0; j <= s2.length; j++) {
                    if (i === 0)
                        costs[j] = j;
                    else {
                        if (j > 0) {
                            let newValue = costs[j - 1];
                            if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                                newValue = Math.min(Math.min(newValue, lastValue),
                                    costs[j]) + 1;
                            costs[j - 1] = lastValue;
                            lastValue = newValue;
                        }
                    }
                }
                if (i > 0)
                    costs[s2.length] = lastValue;
            }
            return costs[s2.length];
        }
        // eslint-disable-next-line no-inner-declarations
        function similarity(s1, s2) {
            let longer = s1;
            let shorter = s2;
            if (s1.length < s2.length) {
                longer = s2;
                shorter = s1;
            }
            let longerLength = longer.length;
            if (longerLength === 0) {
                return 1.0;
            }
            return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
        }


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
                <h2 className="similar-title">Similar topics</h2>
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
                        29 Learning resources
                        <span>Knowledge Density</span>
                    </li>
                    <li>
                        Learn Python in Y minutes
                        <br/>
                        <a>https://learnxinyminutes.com/docs/python/</a>
                        <span>89%</span>
                    </li>
                    <li>
                        Learn Python in Y minutes
                        <br/>
                        <a>https://learnxinyminutes.com/docs/python/</a>
                        <span>89%</span>
                    </li>
                    <li>
                        Learn Python in Y minutes
                        <br/>
                        <a>https://learnxinyminutes.com/docs/python/</a>
                        <span>89%</span>
                    </li>
                    <li>
                        Learn Python in Y minutes
                        <br/>
                        <a>https://learnxinyminutes.com/docs/python/</a>
                        <span>89%</span>
                    </li>
                    <li>
                        Learn Python in Y minutes
                        <br/>
                        <a>https://learnxinyminutes.com/docs/python/</a>
                        <span>89%</span>
                    </li>
                    <li>
                        Learn Python in Y minutes
                        <br/>
                        <a>https://learnxinyminutes.com/docs/python/</a>
                        <span>89%</span>
                    </li>
                    <li>
                        Learn Python in Y minutes
                        <br/>
                        <a>https://learnxinyminutes.com/docs/python/</a>
                        <span>89%</span>
                    </li>
                    <li>
                        Learn Python in Y minutes
                        <br/>
                        <a>https://learnxinyminutes.com/docs/python/</a>
                        <span>89%</span>
                    </li>
                </ul>
            </div>
        </>
    )
}