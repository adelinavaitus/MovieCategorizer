
To set up the development environment for the project you can follow these steps:

1. Clone the repository to your local machine using Git. You can use Sourcetree or by running the following command in your terminal:

### `git clone https://bitbucket.org/adelinavaitus/technical-assignment.git`


2. If you don't have node.js installed, you can download it from the official site:  https://nodejs.org/en and install it.


3. Open the project in Visual Studio Code and open a new terminal or navigate to the project directory


4. Install dependencies:

### `npm install`


5. Set up environment variables 

*  Create a ".env" file. The ".env" file should be placed at the root directory of the project, in our case "movie-project" folder

* In the ".env" file add the following line:  

### `REACT_APP_API_KEY=your_TMDB_api_key`   
 you can retrieve your API key from the site: https://www.themoviedb.org/


6. Run the development server:
### `npm start`


7.  Access the application - you should be able to acces the application by opening a web browser and navigato to the appropiate url: http://localhost:3000



That's it! You should have the development environment set up! 😄


