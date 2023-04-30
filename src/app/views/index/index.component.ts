import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
title= "Charles McCall - Dev and Creative"
musicUrlList: Array<string> = ["https://drive.google.com/file/d/1wD7Beul2z8LMgrgPnG33Ik0kuIuNKF1A/preview", "https://drive.google.com/file/d/1U9GbAlxaBik5ZilaQAfme1ARyUfLmU5e/preview"]
musicNameList: Array<string> = ["Everything But Desire", "Trouble You Can Borrow"] 
}
