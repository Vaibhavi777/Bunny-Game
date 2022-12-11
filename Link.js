class Link{
    constructor(a,b){
        var lastlink=a.body.bodies.length-2
        this.link=Constraint.create({
            bodyA:a.body.bodies[lastlink],
            bodyB:b,
    
            length:-10,
            stiffness:0.01

        })
        World.add(world,this.link)
    }
    break(){
        World.remove(world,this.link)
    }
}
