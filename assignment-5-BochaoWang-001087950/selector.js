class Node {

    constructor(tagName, children, parent) {
  
      this.parent = parent;
  
      this.tagName = tagName;
  
      //children is an array of node objects.
  
      this.children = children;
  
    }
  
    /**
  
    Implement below method.  Returns an array of all descendant nodes matching the selector.
  
    The selector could be a simple CSS selector or descendant CSS selector.
  
    Examples    selector = "p" |  selector = "p div"
  
    return [node1, node2, ...]
  
    */
  
    querySelectorAll(selector) {
        var tags = selector.split(" ");
        var res = [];
        if(tags.length == 0 || tags == [] ){
            return null;
        }
        function dfs(selectors,depth,tags,res){
            //when get out of the border, return to previous layer
            if(depth>=tags.length){
                return;
            }

            //when reach the border and the tagName is same as tags provided,push it into result
            if(depth === tags.length-1  && selectors.tagName == tags[depth]){
                res.push(selectors);
            }

            //if tags are not same, continue to search in its children , but depth not change
            if(selectors.tagName != tags[depth]){
                for(var childrens of selectors.children){
                    dfs(childrens,depth,tags,res);
                  }
            }
            //else if tags are all same ,continue to search in its children and depth +1
            else{
                selectors.children.forEach(childrens => dfs(childrens,depth+1,tags,res));
            }
        }
        //dfs from  the head node
        dfs(this, 0, tags, res);
        if(res.length === 0){
            console.log("no node found");
        }
        else{
            return res;
        }
        

    }
  
    /**
  
    Implement below method.  Add the node to the current node's parent. 
  
    This method does not return any value.
  
    */
  
    addSibling(node) {
        node.parent = this.parent;
        this.parent.children.push(node);
    }
  
  }


//construct
//create a tree looks like:
//testhtml->div1->a1
//testhtml->p1->a2
//testhtml->p2->div2
var testhtml = new Node("html",[],null);
var div1 = new Node("div",[],testhtml);
var a1 = new Node("a",[],div1);
var p1 = new Node("p",[],testhtml);
var a2 = new Node("a",[],p1);
var p2 = new Node("p",[],testhtml);
var div2 = new Node("div",[],p2);


testhtml.children.push(div1);
div1.children.push(a1);

testhtml.children.push(p1);
p1.children.push(a2);

testhtml.children.push(p2);
p2.children.push(div2);

function run1() {
    console.log("try to find html div a");
    var res = testhtml.querySelectorAll("html div a")
    console.log(res);

    console.log("before add p3, try to find html div p");
    var res2 = testhtml.querySelectorAll("html div p")
    console.log(res2);

}
//before add p3, can not find html div p
run1();

function addparent(){
    //a parent p node to be added
    var p3 = new Node("p",[],null);
    a1.addSibling(p3);
}

//after add this, a1 has one more brother p3, we can find html div p
addparent();


function run2() {
    console.log("after add p3, try to find html div p");
    var res = testhtml.querySelectorAll("html div p")
    console.log(res);
}

//after add p3, we can find html div p
run2();


