import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MainServicesService } from 'src/app/services/main-services.service';
@Component({
  selector: 'app-analytical-data',
  templateUrl: './analytical-data.component.html',
  styleUrls: ['./analytical-data.component.css']
})
export class AnalyticalDataComponent implements OnInit {
  pieChart: Chart = new Chart({}); 
  donutChart: Chart = new Chart({}); 
  history: [{}]=[{}];
  pages :[{}] = [{}]
  constructor(
    private service:MainServicesService
  ){}

  ngOnInit(): void {
    
    this.service.getHistory("asc").subscribe({
      next: (res: any) => {
      
        this.history = res.map((item: { word: string; count: number; }) => ({
        name: item.word,
        y: item.count,
        color: this.getRandomColor(),
        }));
        this.historyWisePieChart();
      }, error: (err: any) => {
        console.log(err);
      }
    })

    this.service.getVisitedPages().subscribe({
      next:(res:any)=>{
        
        this.pages = res.map((item: { visitedPages: string; count: number; }) => ({
          name: item.visitedPages,
          y: item.count,
          color: this.getRandomColor(),
          }));
          this.pageWisePieChart();
      },error: (err: any) => {
        console.log(err);
      }
    })
    
  }



  historyWisePieChart() { 
    this.pieChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow:true
      },
      title: {
        verticalAlign: 'middle',
        floating:true,
        text: 'History',
        style: {
          color: '#ffff'
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '5%',
          borderWidth: 10,
          borderColor: '',
          dataLabels: {
            connectorWidth:0
          }
        }
      },
      legend: {
        enabled:false
      },
      series: [
          {
            type: 'pie',
            data: this.history,
          },
        ],
    })
  }



  pageWisePieChart() { 
    this.donutChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow:true
      },
      title: {
        verticalAlign: 'middle',
        floating:true,
        text: 'Visited Pages'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '95%',
          borderWidth: 10,
          borderColor: '',
          dataLabels: {
            connectorWidth:0
          }
        }
      },
      legend: {
        enabled:false
      },
      series: [
          {
            type: 'pie',
            data: this.pages,
          },
        ],
    })
  }



  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  logout(){
    this.service.logout().subscribe({
      next:()=>{
        localStorage.removeItem("tok")
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
