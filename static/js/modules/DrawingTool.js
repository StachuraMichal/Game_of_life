import $ from 'jquery';

class DrawingTool {
    constructor() {
        this.canvas        = document.querySelector('#canvas');
        this.ctx           = this.canvas.getContext("2d");
        this.resize();
        this.makeGrid();
        
        this.allowDraw = $('#allow-draw');

        this.drawButton = $("#draw-button");
        this.eraseButton = $("#erase");
        this.draw = true;
        this.events();
    }

    events(){
        this.drawButton.on('click', () => {
            this.draw = true;
            this.drawButton.removeClass('btn-outline-success');
            this.drawButton.addClass('btn-success');
            this.eraseButton.addClass('btn-outline-danger');
            this.eraseButton.removeClass('btn-danger');
        })
        this.eraseButton.on('click', () => {
            this.draw = false;
            this.drawButton.addClass('btn-outline-success');
            this.drawButton.removeClass('btn-success');
            this.eraseButton.removeClass('btn-outline-danger');
            this.eraseButton.addClass('btn-danger');
        })
        this.allowDraw.on('click', () => {
            if(this.allowDraw.is(':checked')){
                this.drawButton.removeClass('d-none');
                this.eraseButton.removeClass('d-none');
                this.drawButton.collapse('show');
                this.eraseButton.collapse('show');
            }
            else{
                this.drawButton.collapse('hide');
                this.eraseButton.collapse('hide');
            }

        })
    }


    render(array, cellSize) {
        this.clear();
        this.ctx.fillStyle = "green";
        for (var i=0; i< array.length; i++){
            for (var j =0; j< array[0].length; j++){
                
                if (array[i][j] == 1) this.ctx.fillRect(cellSize*i, cellSize*j, cellSize, cellSize);
            }
           
        }
        this.makeGrid(cellSize);
        
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    }

    resize(width = 500,height =500){
      
        this.canvas.width = width;
        this.canvas.height = height;
        
        
    }

    makeGrid(cellSize = 20){
        if (cellSize < 10) return;
        var x = Math.floor(this.canvas.width/cellSize);
        var y = Math.floor(this.canvas.height/cellSize);
        this.ctx.strokeStyle = "grey";
        this.ctx.lineWidth = 1;
        for (var i = 0 ; i<= x ; i++){
            this.ctx.beginPath();
          
            this.ctx.moveTo(cellSize*i, 0);
            this.ctx.lineTo(cellSize*i, this.canvas.height);
            this.ctx.stroke();
        }

        for (var j = 0 ; j<=y ; j++){
            this.ctx.beginPath();
            
            this.ctx.moveTo(0, cellSize*j);
            this.ctx.lineTo(this.canvas.width, cellSize*j);
            this.ctx.stroke();
        }
    }

    fillCell(x, y, cellSize, array){
        var rect = this.canvas.getBoundingClientRect();
        let xi = Math.floor((x-rect.left)/cellSize);
        let yi = Math.floor((y-rect.top)/cellSize);
    
        let col = [...array[xi]];
        col[yi] = this.draw ? 1 : 0;
        array[xi] = col;
        this.render(array, cellSize)
/*         this.draw ? this.ctx.fillStyle = "green" :  this.ctx.fillStyle = "black";
        this.ctx.fillRect(xi*cellSize, yi*cellSize, cellSize, cellSize);
        this.ctx.strokeRect(xi*cellSize, yi*cellSize, cellSize, cellSize); */
    }
    warning(text){
        this.clear();
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, this.canvas.width/2, this.canvas.height/2);

    }

}
export default DrawingTool;