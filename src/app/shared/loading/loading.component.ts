import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { ProgressSpinner } from 'primeng/progressspinner'
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [  
    CommonModule,
    ProgressSpinner
],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() show = false

  ngOnInit(): void {
  }
}
