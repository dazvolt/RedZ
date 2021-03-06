var text_hunger = {
    small: ['%player_name% чувствует что он слегка проголодался', '%player_name% немного голодный', 'У %player_name% немного бурчит живот'],
    medium: ['%player_name% думает что неплохо бы перекусить', '%player_name% хотел бы поесть'],
    big: ['%player_name% ощущает небольшие боли в животе. Хорошо было бы покушать.', '%player_name% размышляет о бытии и голодном желудке'],
    large: ['%player_name% кажется что он сейчас помрет с голоду', '%player_name% очень голодный'],
    critical: ['%player_name% начинает терять кровь из-за того что он голодный. Очень хотелось бы покушать!', '%player_name% теряет кровь из-за голода']
};

var text_thirst = {
    small: ['%player_name% чувствует что он слегка хочет пить', '%player_name% немного хочет пить', 'У %player_name% немного пересушило горло'],
    medium: ['%player_name% думает что неплохо бы выпить воды', '%player_name% хотел бы попить'],
    big: ['%player_name% ощущает небольшие боли и сухость во рту. Хорошо было бы попить.', '%player_name% размышляет о бытии и сухости в глотке'],
    large: ['%player_name% кажется что он сейчас помрет без воды', '%player_name% очень хочет пить'],
    critical: ['%player_name% начинает терять кровь из-за того что он долго не пил воды. Очень хотелось бы попить!', '%player_name% теряет кровь из-за обезвоживания']
};

var text_tired = {
    small: ['%player_name% чувствует что он слегка устал', '%player_name% немного устал', 'У %player_name% немного болят ноги'],
    medium: ['%player_name% думает что неплохо бы передохнуть', '%player_name% хотел бы отдыха'],
    big: ['%player_name% ощущает небольшие боли в ногах. Хорошо было бы отдохнуть.', '%player_name% размышляет о бытии и болящих ногах.'],
    large: ['%player_name% кажется что он сейчас свалится с ног.', '%player_name% очень хочет отдохнуть.'],
    critical: ['%player_name% начинает терять кровь из-за того что он дико устал.!', '%player_name% теряет кровь из-за усталости.']
};

var player_death = [
    '%player_name% погиб от кровопотери. Плохо следил за собой, не иначе... <br /><br />',
    'Ты умер, %player_name%. Я поставлю свечку за тебя. <br /><br />',
    '%player_name% слегка улыбается и понимает что его путь сейчас окончен. В глазах темнело... <br /><br />',
    '%player_name% думал что весело было бы сейчас отмотать время на пару лет назад. Но кровоточащие раны говорили о том, что скоро мотать уже нечего будет даже в голове... <br /><br />'
];
var enemy_appear = ['%player_name% замечает что рядом кто-то есть... Из-за угла показывается зомби. Что делать?', '%player_name% в панике замечает что его окружают зомби. Что делать?', '%player_name% встрепенулся и не зря: рядом появились зомби. Что делать?'];
var enemy_fight_melee = ['%player_name% дает %weapon_name% по башке рядом стоящему зомби.', '%player_name% выхватывает %weapon_name% и колошматит им зомби вокруг.'];
var enemy_fight_gun = ['%player_name% стреляет из %weapon_name% в голову зомби.', '%player_name% выхватывает %weapon_name% и палит по зомби вокруг.'];
var enemy_fight_gun_result_good = ['%player_name% смог перестрелять всех зомби.'];
var enemy_fight_gun_result_bad = ['%player_name% не смог перестрелять всех зомби и его неплохо пожрали пока он убегал.'];
var enemy_fight_melee_result_good = ['%player_name% смог перебить всех зомби.'];
var enemy_fight_melee_result_bad = ['%player_name% не смог перебить всех зомби и его неплохо погрызли пока он убегал.'];
var enemy_run = ['%player_name% удирает подальше от зомби'];
var enemy_run_bad = ['%player_name% удирает подальше от зомби, но не очень удачно и по дороге его погрызли.'];
var enemy_stay = ['%player_name% затаив дыхание, ждет пока зомби уйдут'];
var enemy_stay_bad = ['%player_name% затаив дыхание, ждет пока зомби уйдут. Зомби не уходят а замечают его и грызут. %player_name% принимает решение что пора убежать и убегает.'];
var enemy_fight_gun_fail = ['%player_name% хотел сражаться с зомби с помощью оружия но у него оружия не оказалось... %player_name% бежит к зомби и бьет ему в нос кулаком.'];