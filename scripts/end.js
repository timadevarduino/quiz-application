const username=$('#username');
const saveScoreBTN=$('#SaveScoreBTN');

const mostRecentScore=localStorage.getItem('mostRecentScore');
$('#finalScore').text(mostRecentScore);

username.keyup(function(){
saveScoreBTN.attr('disabled', !username.val())
});

saveScoreBTN.click(function(){
    console.log('Save score operation');
})