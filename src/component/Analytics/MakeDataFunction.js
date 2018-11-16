export default (items)=>{
    let labels =[];
    let backgroundColor = [];
    let data = [];
    let i =0;
    for (const [k, v] of items) {
        labels = [...labels, k];
        backgroundColor = [...backgroundColor, RandomColor(i)];
        data = [...data , (v/100).toFixed(2)];
        i = i+1;
    }    
    return {labels: labels, datasets:[{backgroundColor: backgroundColor, data:data}]}  
}

const colors = ['#3cb44b', '#e6194b', '#ffe119', '#4363d8', '#f58231', 
'#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', 
'#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080']

const RandomColor = (Spot) =>{
    if(Spot < colors.length){
        return colors[Spot];
    }
    else{
    let max = 0xffffff;
    return '#' + Math.round( Math.random() * max ).toString( 16 );
    }
}

