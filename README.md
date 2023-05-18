# Overview

Quote Oasis is a web-app that displays random quotes and allows allows users to easily share quotes on various social media platforms. This app follows a set of **user stories** to ensure the required functionality is implemented correctly:

-   [ ] User can can see a wrapper element with a corresponding id="quote-box".

-   [ ] Within #quote-box, user can see an element with a corresponding id="text".

-   [ ] Within #quote-box, user can see an element with a corresponding id="author".

-   [ ] Within #quote-box, user can see a clickable element with a corresponding id="new-quote".

-   [ ] Within #quote-box, user can see a clickable a element with a corresponding id="tweet-quote".

-   [ ] On first load, the quote machine displays a random quote in the element with id="text".

-   [ ] On first load, the quote machine displays the random quote's author in the element with id="author".

-   [ ] When the #new-quote button is clicked, the quote machine should fetch a new quote and display it in the #text element.

-   [ ] The quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.

-   [ ] User can tweet the current quote by clicking on the #tweet-quote a element. This a element should include the <span>"twitter.</span>com/intent/tweet" path in its href attribute to tweet the current quote.

-   [ ] The #quote-box wrapper element should be horizontally centered.

The app is deployed at the following link: **https://quotes-oasis.onrender.com**.

## Technologies

HTML, JS, React, SASS/SCSS, React-Bootstrap, Font Awesome.

## Dependencies

Data is fetched from the API Ninjas via the following [endpoint](https://api-ninjas.com/api/quotes).

## Appearance

<img src="/src/assets/quote_oasis_app.png" alt="quote page">

## How to launch locally

In the project directory you should:

-   Create .env-file and define an environmental variable called VITE_API_KEY inside that file. The variable should equal your free API Key from the [API Ninjas](https://api-ninjas.com/). Example:

    `VITE_API_KEY=Iaz8Y1M ... ... 2HHn44g==YnPK63jrM8TgJjtj`

-   Install dependencies

    `npm install`

-   Start the project

    `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Acknowledgements

The Technotes project is inspired by the FreeCodeCamp "Build a Random Quote Machine" challenge.
