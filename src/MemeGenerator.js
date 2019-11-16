import React, {Component} from 'react';
import './index.css';

class MemeGenerator extends Component {
    constructor () {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: 'https://i.imgflip.com/345v97.jpg',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                console.log(typeof memes);
                this.setState({
                    allMemeImgs: memes
                })
            })
            .catch(error =>
                console.log(error));    
    }

    handleChange (event) {
        const {name, value} = event.target;
        this.setState ({
            [name]: value 
        })
    }

    handleSubmit (event) {
        event.preventDefault();
        console.log(this.state.allMemeImgs);
        const memesArr = this.state.allMemeImgs;
        const randomMemeImg = memesArr[Math.floor(Math.random() * memesArr.length)].url;
        this.setState ({randomImg: randomMemeImg});
    }

    render() {
        
        return (
            <div>
                <form className='meme-form' onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="top text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input
                        type='text'
                        name='bottomText'
                        placeholder = 'bottom text'
                        value = {this.state.bottomText}
                        onChange = {this.handleChange}
                    />

                    <button>Change Meme</button>
                </form>
                <div className='meme'>
                    <img src={this.state.randomImg} alt='' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;