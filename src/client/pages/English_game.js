import React from "react";
import { quizData } from "./Components/quizData";
import "./Components/style_quiz.css";
import {User} from "../services/apiService"

class English_game extends React.Component {
 
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: this.props.user.score,
    disabled: true,
    right_before:'',
   
  };

  
  loadQuizData = () => {
    // console.log(quizData[0].question)
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }
  nextQuestionHandler = () => {
    // console.log('test')
	this.setState({disabled:false});
    const { myAnswer, answer, score } = this.state;
    console.log('myAnswer', myAnswer)
    console.log('answer', answer)
    if (myAnswer === answer) {
      const newScore = score + 1
      this.setState({
        score: newScore,
		  right_before: 'yess! get point!'
      })
      User.update(this.props.user._id, {score: newScore}) // update server with new score

      } else{
          this.setState({
            right_before:'no, the answer is: '+ answer
          });
        }
    this.setState({
      currentQuestion: Math.floor(Math.random() * 4) + 1
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  render() {
    console.log('props', this.props)
    const { options, myAnswer , score , right_before} = this.state;

      return (
        <div className="Api">
          <h1>{this.state.questions} </h1>
			  {right_before}<br/>
			  your score is: {score}<br/>
  
		  
          <span>{}</span>
          {options.map(option => (
            <p
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          { (
            <button className="ui inverted button"  disabled={this.state.disabled} onClick={this.nextQuestionHandler}>Next</button>
          )}

        </div>
      );
    }
  }


export default English_game;