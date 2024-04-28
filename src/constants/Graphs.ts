export const optionsBars = {
    chart: {
        type: 'line',
        foreColor: '#fff',
        toolbar: {
            show: false
        },
        width: '100%'
    },
    xaxis: {
        categories: [] as string[],
    },
    colors: ['#bb86fc'],
    tooltip: {
        theme: 'dark'
    },
    dataLabels: {
        enabled: false
    }
}

export const optionsDonut = {
    chart: {
        type: 'donut',
        foreColor: '#fff',
        toolbar: {
            show: false
        },
        width: '100%'
    },
    plotOptions: {
        pie: {
            expandOnClick: false
        }
    },
    colors: ['#bb86fc', '#121212'],
}