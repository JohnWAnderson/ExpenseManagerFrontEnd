export default (items)=>{
    let labels =[];
    let backgroundColor = [];
    let data = [];
    for (const [k, v] of items) {
        labels = [...labels, k];
        backgroundColor = [...backgroundColor, RandomColor()];
        data = [...data , (v/100).toFixed(2)];
    }    
    return {labels: labels, datasets:[{backgroundColor: backgroundColor, data:data}]}  
}

const RandomColor = () =>{
    var max = 0xffffff;
    return '#' + Math.round( Math.random() * max ).toString( 16 );
}