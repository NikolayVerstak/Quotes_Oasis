import React from "react";
import "./App.scss";
import logo from "./assets/my_logo.svg";

/**
 * Represents the main application component.
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        /**
         * Initialize the component's state
         * @type {object}
         * @property {string} category - The selected category
         * @property {string} quote - The current quote
         * @property {string} author - The author of the current quote
         * @property {string} color - The current color
         * @property {boolean} isLoading - Flag indicating if data is being loaded
         * @property {string} error - The error message if data could be fetched
         */
        this.state = {
            category: "happiness",
            quote: "",
            author: "",
            color: "",
            isLoading: false,
            error: "",
        };

        /**
         * The available categories for quotes
         * @type {string[]}
         */
        this.categories = [
            "attitude",
            "business",
            "change",
            "dreams",
            "education",
            "experience",
            "failure",
            "fitness",
            "future",
            "happiness",
            "health",
            "humor",
            "knowledge",
            "life",
            "money",
            "success",
        ];

        /**
         * Reference to the quote section
         * @type {React.RefObject<HTMLDivElement>}}
         */
        this.quoteDiv = React.createRef();
    }

    componentDidMount() {
        // Set the initial color and fetch a new quote
        document.body.style.setProperty("--color", this.state.color);
        this.fetchNewQuote();
    }

    componentDidUpdate(prevProps, prevState) {
        // Fetch a new quote when the category is changed
        if (prevState.category !== this.state.category) {
            this.fetchNewQuote();
        }
    }

    /**
     * Animates the text color change
     * @param {string} prevColor - The previous color
     * @param {string} newColor - The new color
     */
    colorText = (prevColor, newColor) => {
        this.quoteDiv.current.animate(
            {
                opacity: [0, 1],
                color: [prevColor, newColor],
            },
            800
        );
    };

    /**
     * Fetches a new quote from the API
     */
    fetchNewQuote = () => {
        const { category } = this.state;
        const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

        // Set the loading state and fetch the quote
        this.setState({ isLoading: true }, () => {
            fetch(url, {
                headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        // Extract the quote and author from the response
                        const { quote, author } = data[0];

                        // Update the state with the new quote and author
                        this.setState({ quote, author }, () => {
                            const prevColor = this.state.color;
                            const newColor = this.changeColor();
                            // Animate the color change in the quote section
                            this.colorText(prevColor, newColor);
                            this.setShareLinks();
                        });
                    } else {
                        throw new Error("No quotes found");
                    }
                })
                .catch((error) => {
                    this.setState({
                        quote: "Something went wront. Please, try it later!",
                        author: "Customer Service",
                        error,
                    });
                    document.body.style.setProperty("--color", "#F56F26");
                    console.error("Error fetching quotes:", error);
                })
                .finally(() => {
                    // Clear the loading state
                    this.setState({ isLoading: false });
                });
        });
    };

    /**
     * Changes the background color
     * @returns {string} - The new color
     */
    changeColor = () => {
        const newColor = this.selectColor();
        // Update the state with the new color and set it in the CSS variables
        this.setState({ color: newColor });
        document.body.style.setProperty("--color", newColor);
        return newColor;
    };

    /**
     * Selects a random color from the available colors.
     * @returns {string} - The selected color
     */
    selectColor = () => {
        const { color } = this.state;
        const colors = [
            "#485440",
            "#697C5F",
            "#643A6B",
            "#5F264A",
            "#6854C0",
            "#088395",
            "#577D86",
            "#5D5167",
            "#756957",
            "#2E4F4F",
            "#9D5858",
            "#645978",
            "#0F6292",
            "#205E61",
            "#544BB4",
            "#475871",
            "#820000",
            "#8D3565",
            "#604234",
            "#2F3D6F",
        ];
        // Exclude the current color from the available colors
        const excludeCurrentColor = colors.filter((colorInArray) => colorInArray !== color);
        // Select a random color from the remaining colors
        const newColor =
            excludeCurrentColor[Math.floor(Math.random() * excludeCurrentColor.length)];

        return newColor;
    };

    /**
     * Sets the share links for social media sharing
     */
    setShareLinks = () => {
        const link = encodeURI(window.location.href);
        const post = encodeURIComponent(`"${this.state.quote}" ${this.state.author}`);
        const title = encodeURIComponent("Check out this inspiring quote from Quote Oasis!");

        // Define the share buttons with their respective URLs, icons, and titles
        const shareButtons = [
            {
                id: "tweet-quote",
                href: `http://twitter.com/intent/tweet?text=${post}&hashtags=quote,${this.state.category}`,
                icon: "fa fa-twitter",
                title: "Tweet this quote!",
            },
            {
                id: "email-quote",
                href: `mailto:?subject=${title}&body=${post}`,
                icon: "fa fa-envelope",
                title: "Send this quote via Email!",
            },
            {
                id: "telegram-quote",
                href: `https://telegram.me/share/url?url=${link}&text=${post}`,
                icon: "fa fa-telegram",
                title: "Send this quote via Telegram!",
            },
        ];

        // Iterate over the share buttons and set their properties
        shareButtons.forEach((button) => {
            const { id, href, icon, title } = button;
            const anchorTag = document.getElementById(id);
            anchorTag.href = href;
            anchorTag.title = title;
            anchorTag.target = "_blank";
            if (id !== "email-quote") anchorTag.addEventListener("click", this.openURL);

            let iconElement = anchorTag.querySelector("i");
            if (!iconElement) {
                // Create and append the icon element if it doesn't exist
                iconElement = document.createElement("i");
                iconElement.className = `${icon} text-white`;
                anchorTag.appendChild(iconElement);
            }
        });
    };

    /**
     * Opens a URL in a new window for sharing
     * @param {Event} event - The click event
     */
    openURL = (event) => {
        event.preventDefault();

        window.open(
            event.target.href,
            "Share",
            "left=20,top=20, width=400, height=500, toolbar=1, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0"
        );
    };

    /**
     * Renders the quote section
     * @returns {JSX.Element} - The quote section component
     */
    renderQuoteSection = () => {
        const { quote, author, isLoading } = this.state;

        return (
            <section className="quote" ref={this.quoteDiv}>
                {isLoading ? (
                    // Render the loader if the quote is loading
                    <div className="loader">
                        {[1, 2, 3].map((num, i) => {
                            return <div key={i} className={`box-load${num}`}></div>;
                        })}
                    </div>
                ) : (
                    <>
                        <div className="quote-text">
                            {/* Render the quote text */}
                            {quote && <i className="fa fa-quote-left ms-2"></i>}
                            <span id="text">{quote}</span>
                        </div>
                        <div className="quote-author pt-3">
                            {/* Render the author */}
                            <span id="author">{author ? `- ${author}` : ""}</span>
                        </div>
                    </>
                )}
            </section>
        );
    };

    /**
     * Renders the footer with logo
     * @returns {JSX.Element} - The footer element
     */
    renderFooter = () => {
        return (
            <footer className="mt-3 text-center">
                <img src={logo} alt="my logo" />
            </footer>
        );
    };

    render() {
        const { quote, author, category, error, isLoading } = this.state;

        if (!quote || !author) {
            // Render a welcome message if there is no quote or author
            return <h2 id="greeting">Welcome to the Quote Collection!</h2>;
        }

        if (error)
            // Render an error message if data could be fetched
            return (
                <>
                    <main
                        id="quote-box"
                        data-testid="quote-box"
                        className="px-md-5 py-md-4 p-sm-4 p-3">
                        {this.renderQuoteSection()}
                    </main>
                    {this.renderFooter()}
                </>
            );

        return (
            <>
                <header className="mb-3">
                    <h2>Quote Category:</h2>
                    <select
                        onChange={(event) => this.setState({ category: event.target.value })}
                        value={category}>
                        {/* Render the category options */}
                        {this.categories.map((category, index) => (
                            <option value={category} key={index}>
                                {category}
                            </option>
                        ))}
                    </select>
                </header>
                <main id="quote-box" className="px-md-5 py-md-4 p-sm-4 p-3">
                    {/* Render the quote section */}
                    {this.renderQuoteSection()}
                    <section className={isLoading ? "buttons mt-4 disabled" : "buttons mt-4"}>
                        {/* Render the share buttons */}
                        {["tweet-quote", "email-quote", "telegram-quote"].map((id) => (
                            <a key={id} className="button p-2" id={id} />
                        ))}
                        {/* Render the new quote button */}
                        <button
                            className="button px-3 py-2 text-white"
                            id="new-quote"
                            onClick={() => this.fetchNewQuote()}>
                            New Quote
                        </button>
                    </section>
                </main>
                {/* Render the logo */}
                {this.renderFooter()}
            </>
        );
    }
}
