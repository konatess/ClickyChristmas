import React, { Component } from 'react';
import { Col, Row, Container } from "./components/Grid";
import Image from "./components/Image";
import Button from "./components/Button";
import './App.css';

function importAll(r) {
    let links = {};
    let allkeys = r.keys().map((item) => {
        let key = item.replace('./', '');
        links[key] = r(item);
        return key;
    });
    let allImagesObj = { keys: allkeys, links: links };
    return allImagesObj;
}

function generateImageGroup(gameLevel, allImages) {
    let imageGroup = [];
    let indexList = [];
    for (let i = 0; i < gameLevel; i++) {
        let imageIndex = Math.floor((Math.random() * 50))
        if (!(indexList.includes(imageIndex))) {
            indexList.push(imageIndex)
        }
        else {
            i--
        }
    }

    for (let j = 0; j < indexList.length; j++ ) { 
        let name = allImages.keys[indexList[j]];
        let imageObj = {
            name: name,
            link: allImages.links[name],
            wasclicked: false
        }
        imageGroup.push(imageObj);
    };
    indexList.length = 0
    return imageGroup;
}

const images = importAll(require.context('./images', false, /\.(png)$/));

console.log(images);
// console.log(images["santaclaus.png"]);

class App extends Component {
    state = {
        level: 12,
        buttons: [12, 16, 24, 36],
        imagenames: ["angel.png", "bauble.png", "bell.png", "bonfire.png", "boot.png", "boy.png", "breakfast.png", "cabin.png", "candies.png", "candle.png"],
        images: images
    };

    render() {
        return (
            <div className="App text-white h-md-100">
                <Row height="auto md-100">
                    <Col size="12 md-2" height="auto md-100">
                        <nav className="nav flex-row flex-md-column px-2 py-md-5 bg-green h-auto h-md-100">
                            <div className="d-flex flex-row flex-wrap">
                                {this.state.buttons.map(button => (
                                    <Button
                                        key={button}
                                        text={button}
                                    />
                                ))}
                            </div>
                            <br />
                            <p>Choose your difficulty above, then click on each image to play. Can you get throught them all without repeating yourself?</p>
                            <br/>
                            <p>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>, licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></p>
                        </nav>
                    </Col>
                    <Col size="12 md-10">
                        <Container className="m-5 border-white">
                            {this.state.imagenames.map(image => (
                                <Image 
                                    key={image}
                                    name={image}
                                    url={this.state.images.links[image]}
                                />
                            ))}
                        </Container>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
