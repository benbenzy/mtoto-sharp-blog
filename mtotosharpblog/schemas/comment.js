export default {
    name:"comment",
    title:"Comment",
    type:"document",
    fields:[
        {
            name: 'name',
            type: 'string',
          },
          {
            name: 'email',
            type: 'string',
          },
          {
              name:"approved",
              title:"Approved",
              type:"boolean",
              description:"comments will be approved to show on site"
          },
          {
            name: 'comment',
            type: 'text',
          },{
              name:'post',
              type:"reference",
              to:[{type:"post"}]
          }
    ]
    
}