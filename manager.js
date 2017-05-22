class TetrisManager
{
    constructor(document) 
    {
        this.document = document;

        this.template = document.getElementById('player-template');

        this.instances = new Set; // a bit better then having an array not entirely sure why

    }

    createPlayer()
    {
        const element = this.document
            .importNode(this.template.content, true) // Thanks you StackOverFlow... Jesus
            .children[0];

        const tetris = new Tetris(element);
        this.instances.add(tetris);

        this.document.body.appendChild(tetris.element);

        return tetris;
    }

    removePlayer(tetris)
    {
        this.instances.delete(tetris);
        this.document.body.removeChild(tetris.element);

    }
}