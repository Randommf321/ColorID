applyRandomColor();

var refreshButton=document.querySelector('.refresh');
refreshButton.addEventListener('click', function(){
    applyRandomColor();
});

function getRandomColor(){
    var color='#';
    var letters='0123456789ABCDEF';
    for (var i=0; i<6; i++) {
        color+=letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function applyRandomColor(){
    var boxes=document.querySelectorAll('.mybox');
    boxes.forEach(function(box, index) {
        var color=index===0 ? 'rgba(255, 255, 255, 0.5)' : getRandomColor();
        box.style.backgroundColor=color;

        var colorCode=box.querySelector('.colorCode');
        if (!colorCode){
            colorCode=document.createElement('div');
            colorCode.className='colorCode';
            box.appendChild(colorCode);
        }
        colorCode.textContent=index===0 ? 'transparent' : color;

        box.classList.remove('tilt-left', 'tilt-right');
        if (index!==0){
            box.classList.add(Math.random()>0.5 ? 'tilt-left' : 'tilt-right');
        }

        box.onclick=function(event){
            var originalText=colorCode.textContent;
            navigator.clipboard.writeText(originalText).then(function(){
                colorCode.textContent='Copied!';
                setTimeout(function(){
                    colorCode.textContent=originalText;
                }, 1000);
            });
        };
    });
}
