export const dataMonth = [
    {label:"Month",value:"Month",id:0},
    {label:"January",value:"01",id:1},
    {label:"February",value:"02",id:2},
    {label:"March",value:"03",id:3},
    {label:"April",value:"04",id:4},
    {label:"May",value:"05",id:5},
    {label:"June",value:"06",id:6},
    {label:"July",value:"07",id:7},
    {label:"August",value:"08",id:8},
    {label:"September",value:"09",id:9},
    {label:"October",value:10,id:10},
    {label:"November",value:11,id:11},
    {label:"December",value:12,id:12},
];

export const Days = [
   {value:"01"},{value:"02"},{value:"03"},{value:"04"},{value:"05"},
   { value:"06"},{value:"07"},{value:"08"},{value:"09"},{value:"10"},
   {value:"11"},{value:"12"},{value:"13"},{value:"14"},{value:"15"},
   {value:"16"},{value:"17"},{value:"18"},{value:"19"},{value:"20"},
   {value:"21"},{value:"22"},{value:"23"},{value:"24"},{value:"25"},
   {value:"26"},{value:"27"},{value:"28"},{value:"29"},{value:"30"},{value:"31"},
]

// for(let i = 1; i <= 31;i++) {
//         Days.push({value:i})
// }


export const years = []

for (let i = [new Date().getFullYear()]; i >= 1903 ; i--) {
    years.push(i)
  }


  