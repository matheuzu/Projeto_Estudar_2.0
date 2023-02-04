<?php
    date_default_timezone_set ("America/Sao_Paulo");
    $acao = 'recuperar';
    require 'app/quadro.controller.php';
    $dia = isset($_GET['dia']) ? $_GET['dia'] : date('Y-m-d');
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estudar</title>
    <link rel="stylesheet" href="estilos/estilo.css">
    <script src="https://kit.fontawesome.com/f92cd33182.js" crossorigin="anonymous"></script>
    <script>
        function mudarDia(dia) {
            location.href = 'index.php?dia='+dia
        }
    </script>
</head>
<body>
    <!-- Quadro -->
    <div id="datas">
        <input type="date" name="dia" id="dia" onchange="mudarDia(this.value)" value="<?= $dia ?>">
        <select name="dias" id="revisao" onchange="mudarDia(this.value)">
            <option value="<?= $dia ?>" default style="display:none;"><?= $dia ?></option>
            <option value="<?=date('Y-m-d')?>"><?=date('Y-m-d')?></option>
            <?php
                sort($dias);
                foreach($dias as $indice => $dia) {
                if(date('Y-m-d') != $dia->dia) { ?>
                <option value="<?=$dia->dia?>"><?=$dia->dia?></option>
          <?php } } ?>
            </select>
    </div>
    <main id="quadro">
        <?php #imprimindo os blocos no quadro
            foreach($blocos as $bloco) { ?>
            <div class="bloco">
                <h3 class="titulo"><?= $bloco->titulo ?></h3>
                <span class="tempo"><?= $bloco->tempo ?></span>
                <div class="anotacao">
                    <p><?= $bloco->descricao ?></p>
                </div>
                <div class="revisao"></div>
                <div class="editar" onclick="editar(<?= $bloco->id ?>, '<?= $bloco->titulo ?>',  `<?= $bloco->descricao ?>`, '<?= $bloco->tempo ?>')">
                    <div id="editar">
                        <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                    </div>
                </div>
                <div class="lixeira" onclick="excluir(<?= $bloco->revisao_id ?>)">
                    <div id="lixo">
                        <i class="fa-sharp fa-solid fa-trash"></i></div>
                    </div>
                </div>       
           <?php } ?>
        <!-- Botão de criar -->
        <div id="criar_container">
            <button onclick="criar()" id="criar">
        </div>    
        <!-- Fim Botão de criar --> 
    </main>
    <script src="main.js">
    </script>
</body>
</html>