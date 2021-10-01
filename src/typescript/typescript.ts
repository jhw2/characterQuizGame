

import img1 from '../images/공유.jpg';
import img2 from '../images/김연경.jpg';
import img3 from '../images/김연아.jpg';
import img4 from '../images/백현.jpg';
import img5 from '../images/이제훈.jpg';
import img6 from '../images/카이.jpg';

interface Images {
    fileName: string;
    answer: string;
}
const ImageObj: Images[] = [
    {fileName: img1, answer: '공유'}, 
    {fileName: img2, answer: '김연경'},
    {fileName: img3, answer: '김연아'},
    {fileName: img4, answer: '백현'},
    {fileName: img5, answer: '이제훈'},
    {fileName: img6, answer: '카이'},
];

export type Direction = 'oneway' | 'retrun'; // 편도, 왕복 설정
interface GameSettingInterface {
    intervalTime: number;
    gameTimeout: ReturnType<typeof setTimeout>[];
    images: Images[];
    currentNum: number;
    changeSetting(peopleNum: number, direction: Direction): void;
    getSettings(): {peopleNum: number, direction: Direction};
    getImage(): Images[];
    resetSettings(): void;
    changeImage(targetImg: HTMLElement, imgInfo: Images): void
    showAnswer(): string;
    startQuiz(element: HTMLElement, gameEndCallbak: ()=> void): void;
    stopQuiz(): void;
}
export class GameSetting implements GameSettingInterface{
    readonly intervalTime: number = 3000;
    gameTimeout: ReturnType<typeof setTimeout>[] = [];
    images: Images[] = this.getImage();
    currentNum: number = 0;
    thisForm = document.getElementById('content');
    constructor(private peopleNum: number, private direction: Direction){
        this.peopleNum = peopleNum;
        this.direction = direction;
    }
    changeSetting(peopleNum: number, direction: Direction){
        this.peopleNum = peopleNum;
        this.direction = direction;
    }
    getSettings(){
        return {peopleNum: this.peopleNum, direction: this.direction}
    }
    getImage(){
        const images: Images[] = [];
        const imageObj: Images[] = [...ImageObj];
        let count: number = this.peopleNum;
        if(this.direction === 'retrun'){
            count = (count * 2) - 1;
        } 
        while(images.length < count){
            const i: number = Math.floor(Math.random() * imageObj.length);
            images.push(imageObj.splice(i, 1)[0]);
        }
        return images;
    }
    changeImage(targetImg: HTMLElement, imgInfo: Images){
        const {fileName, answer} = imgInfo;
        targetImg?.setAttribute('src', fileName); 
        targetImg?.setAttribute('alt', answer);
    }
    resetSettings(){
        this.gameTimeout = [];
        this.images = this.getImage();
        this.currentNum = 0;
        (document.getElementById('targetImg') as HTMLElement)?.remove();
        this.thisForm?.classList.remove('onGameStart');
        this.thisForm?.classList.remove('puseOn');
    }
    showAnswer(){
        let answersHtml = `<ul class='answerList'>`;
            answersHtml += this.images.map((image: Images)=>{
                const {fileName, answer} = image;
                return `<li>
                            <p>${answer}</p>
                            <img src='${fileName}' alt='${answer}' />
                        </li>`;
            });
            answersHtml += `</ul>`;
            return answersHtml;
    }
    stopQuiz(){
        this.gameTimeout.forEach((timeout: ReturnType<typeof setTimeout>)=>{
            clearTimeout(timeout);
        });
        this.resetSettings();
    }
    puseQuiz(){
        this.gameTimeout.forEach((timeout: ReturnType<typeof setTimeout>)=>{
            clearTimeout(timeout);
        });
        this.gameTimeout = [];
        (document.getElementById('targetImg') as HTMLElement).remove();
    }
    startQuiz(element: HTMLElement, gameEndCallbak = ()=>{}){
        if(this.gameTimeout.length > 0){
            this.stopQuiz();
        }
        this.thisForm?.classList.add('onGameStart');

        const images = this.images.slice(this.currentNum, this.images.length);
        element.innerHTML = `<div class='gImgWrap'><img src='${images[0].fileName}' alt='${images[0].answer}' id='targetImg' /><div>`;
        
        for(let i = 1; i < images.length; i++){
            this.gameTimeout.push(setTimeout(()=>{
                this.changeImage(document.getElementById('targetImg') as HTMLElement, images[i]);
                this.currentNum++;
            }, this.intervalTime * i));
        }

        this.gameTimeout.push(setTimeout(()=>{
            this.resetSettings();
            element.innerHTML = this.showAnswer();
            gameEndCallbak();
        }, this.intervalTime * images.length + 1));
    }
    

}

