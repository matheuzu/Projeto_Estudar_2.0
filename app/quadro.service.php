<?php

    class QuadroService {

        private $conexao;
        private $bloco;

        public function __construct(Conexao $conexao,Bloco $bloco ) {
            $this->conexao = $conexao->conectar();
            $this->bloco = $bloco;
        }
        #CRUD
        public function inserir() {
                $query = "
                insert into 
                    blocos(titulo, tempo, descricao, data_criacao) 
                values 
                    (?, ?, ?, ?)
                ";
                echo $this->bloco->__get('dataCriacao');
                $stmt = $this->conexao->prepare($query);

                $stmt->bindValue(1, $this->bloco->__get('titulo'));
                $stmt->bindValue(2, $this->bloco->__get('tempo'));
                $stmt->bindValue(3, $this->bloco->__get('descricao'));
                $stmt->bindValue(4, $this->bloco->__get('dataCriacao'));

                return $stmt->execute();
        }

        public function inserirRevisoes() {
            foreach($this->bloco->revisoes as $indice => $bloco) {
                echo $bloco . '<br>';
                if ($bloco == '') continue;

                $query = "
                SELECT 
                    MAX(b.id) as id, DATE_ADD(b.data_criacao, interval $bloco DAY) as dia_revisao
                from 
                    blocos as b
                where
                    b.data_criacao = ?";

                $stmt = $this->conexao->prepare($query);

                $stmt->bindValue(1, $this->bloco->__get('dataCriacao'));

                $stmt->execute();

                $proximaRevisao[] = $stmt->fetchAll(PDO::FETCH_OBJ);
            }
            print_r($proximaRevisao);
            foreach($proximaRevisao as $obj) {
                foreach($obj as $dia) {
                    $query = "
                    insert into 
                        revisao(bloco_id, dia)
                    values (
                        $dia->id, '$dia->dia_revisao')";

                    $stmt = $this->conexao->prepare($query);

                    $stmt->execute();  
                }
            }
        }

        public function recuperar() {

            $query = "
            select 
                b.titulo, b.tempo, b.descricao, r.dia, r.revisao_id, b.id
            from 
                blocos as b RIGHT JOIN revisao as r
            ON 
                b.id = r.bloco_id
            where 
                r.dia = ?";

            $stmt = $this->conexao->prepare($query);
            $stmt->bindValue(1, $this->bloco->dataCriacao);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_OBJ);

        }

        public function RecuperarDatas() {
            $query = "
            select distinct
                dia
            from 
                revisao 
            ";
            $stmt = $this->conexao->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }

        public function atualizar() {
            $query = "
                update blocos 
                    set titulo = ?, tempo = ?, descricao = ? 
                where 
                    id = ?
            ";

            $stmt = $this->conexao->prepare($query);

            $stmt->bindValue(1, $this->bloco->__get('titulo'));
            $stmt->bindValue(2, $this->bloco->__get('tempo'));
            $stmt->bindValue(3, $this->bloco->__get('descricao'));
            $stmt->bindValue(4, $this->bloco->__get('id'));
            
            $this->inserirRevisoes();

            return $stmt->execute();
        }

        public function remover() {
            $query = "

            delete from 
                revisao 
            where 
                revisao_id = ?;
            ";

            $stmt = $this->conexao->prepare($query);

            $stmt->bindValue(1, $this->bloco->__get('id'));

            $stmt->execute();

        }

    }

?>