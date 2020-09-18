<script>
export default {
  name: "treeNode",
  data() {
    return {
      sss:1
    }
  },
  props:['treeData'],
  render(){
    alert(1)
    return 
       {this.treeData.map((v)=>{

        return  <a-tree-node key={v.key} title={v.title}></a-tree-node>
       
              
        })}

    
  }
}
</script>