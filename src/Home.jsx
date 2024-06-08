import './Home.css'
import {Link, useNavigate} from "react-router-dom";
import {useId, useState} from "react";
import {topics} from "./Topics.jsx";

function Home() {
    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    const bg_id = useId()
    const input_id = useId()
    const searchbox_autocomplete_id = useId()


    const [autocompleteTopics, setAutocompleteTopics] = useState([])
    const [isHovering, setIsHovering] = useState(false)
    return (
    <>
        <div className="bg" id={bg_id}>
            <h1 className="title">Neural</h1>
            <h2 className="subtitle">Open-source learning platform</h2>
            <input type="text" className="searchbox" placeholder="Learn..." autoComplete="off" id={input_id} value={query} onChange={e => {
                setQuery(e.target.value)
                let query_topics = []
                if (e.target.value.length > 0) {
                    for (let i = 0;i < topics.length; i++) {
                        // console.log(topics[i])
                        let topics_len = topics[i].slice(0, e.target.value.length)
                        if (topics_len.toLowerCase() === e.target.value.toLowerCase() && topics_len.length <= e.target.value.length && query_topics.length < 4) {
                            query_topics.push(topics[i])
                        }
                    }
                }
                if (query_topics.length === 0) {
                    document.getElementById(searchbox_autocomplete_id).classList.remove("searchbox-autocomplete-visible")
                }
                setAutocompleteTopics(query_topics)
                if (query_topics.length > 0) {
                    document.getElementById(searchbox_autocomplete_id).classList.add("searchbox-autocomplete-visible")
                    // let one_li_height_percentage = 33.5 * 100 / window.innerHeight
                    if (query_topics.length === 1) {
                        document.getElementById(searchbox_autocomplete_id).style.top = "56%"
                    }
                    if (query_topics.length === 2) {
                        document.getElementById(searchbox_autocomplete_id).style.top = "58.25%"
                    }
                    if (query_topics.length === 3) {
                        document.getElementById(searchbox_autocomplete_id).style.top = "60.25%"
                    }
                    if (query_topics.length === 4) {
                        document.getElementById(searchbox_autocomplete_id).style.top = "62.5%"
                    }
                }
            }} onBlur={() => {
                if (!isHovering) {
                    document.getElementById(searchbox_autocomplete_id).classList.remove("searchbox-autocomplete-visible")
                }
            }} onFocus={() => {
                if (autocompleteTopics.length > 0) {
                    document.getElementById(searchbox_autocomplete_id).classList.add("searchbox-autocomplete-visible")
                }
            }}/>
            <div className="searchbox-autocomplete" id={searchbox_autocomplete_id} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <ul>
                    {
                        autocompleteTopics.map((value, index) => {
                            return <>
                            <Link to={"/learn/"+value}>
                                <li key={index}>
                                    {value}
                                </li>
                            </Link>
                            </>
                        })
                    }
                </ul>
            </div>
            <button className="searchbtn" type="submit" onClick={e => {
                e.preventDefault()
                if (query) {
                    navigate("/learn/"+query)
                } else {
                    document.getElementById(input_id).style.borderColor = "red"
                    setTimeout(() => {
                        document.getElementById(input_id).style.borderColor = null
                    }, 1000)
                }
            }}>
                <svg width="24px" strokeWidth="1.5" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M5 19.5V5C5 3.89543 5.89543 3 7 3H18.4C18.7314 3 19 3.26863 19 3.6V21" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path><path d="M9 7L15 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path><path d="M6.5 15L19 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path><path d="M6.5 18L19 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path><path d="M6.5 21L19 21" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path><path d="M6.5 18C5.5 18 5 17.3284 5 16.5C5 15.6716 5.5 15 6.5 15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.5 21C5.5 21 5 20.3284 5 19.5C5 18.6716 5.5 18 6.5 18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>Learn</button>
        </div>
    </>
  )
}

export default Home
