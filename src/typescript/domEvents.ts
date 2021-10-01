import { Direction, GameSetting } from './typescript';

//게임 시작 이벤트
const gameSetForm: HTMLElement | null =  document.getElementById('gameSetForm');
const formData = new FormData(gameSetForm as HTMLFormElement);
const peopleNum: number = Number(formData.get('peopleNum'));
const direction: Direction = formData.get('direction') as Direction;
const gameSetting = new GameSetting(peopleNum, direction);

document.getElementById('content')?.addEventListener('submit', (e: Event)=>{
    e.preventDefault();
    const target = e.target as Element;
    const submitBtn = document.querySelector('input[name=start]') as HTMLInputElement;
    if(document.body.classList.contains('onGameStart')){
        gameSetting.stopQuiz();
        submitBtn.value = '게임시작하기';
        return false;
    }
    const formData = new FormData(gameSetForm as HTMLFormElement);
    const peopleNum: number = Number(formData.get('peopleNum'));
    const direction: Direction = formData.get('direction') as Direction;

    gameSetting.changeSetting(peopleNum, direction);

    gameSetting.startQuiz(document.getElementById('imageArea') as HTMLElement, ()=>{
        submitBtn.value = '게임시작하기';
    });

    submitBtn.value = '중지';
});

const puseBtn:  HTMLElement | null = document.querySelector('input[name=puse]')
document.getElementById('content')?.addEventListener('click', (e: Event)=>{
    const target = e.target as HTMLInputElement;
    if(target.id === 'puseBtn'){
        if(!document.getElementById('content')?.classList.contains('puseOn')){
            target.value = '재시작';
            document.getElementById('content')?.classList.add('puseOn');
            gameSetting.puseQuiz();
        }else{
            target.value = '일시정지';
            document.getElementById('content')?.classList.remove('puseOn');
            gameSetting.startQuiz(document.getElementById('imageArea') as HTMLElement, ()=>{
                const submitBtn = document.querySelector('input[name=start]') as HTMLInputElement;
                submitBtn.value = '게임시작하기';
            });
        }
    }
})