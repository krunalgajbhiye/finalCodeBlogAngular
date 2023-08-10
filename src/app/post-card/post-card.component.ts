import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/Service/services.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {

  constructor(private route : ActivatedRoute, private getBlogServiceById : ServicesService){}

  public id !:String | null;
  public blog!:any;
  public content!:any;
  items!: any;
  addComment = new FormGroup({

    "id" : new FormControl(),
    "content": new FormControl('',Validators.required),
  });

  OnSumbit(){
    console.log(this.addComment.value);
   // this.service.sendData(this.addBlog.value)

    this.getBlogServiceById.sendComment(this.addComment.value,this.id);
  }

  ngOnInit(){
    console.log("eneter");
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getBlogServiceById.getDataById(this.id).subscribe(
      (data)=>
    {
      console.log(data);
      this.blog= data
      this.content= JSON.stringify({content: data.content});
    },(error)=>{
      console.log("blog doesnt exist");
    }
    );
  }


}
