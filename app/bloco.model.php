<?php 

    class bloco {
        private $id;
        private $titulo;
        private $tempo;
        private $descricao;
        private $dataCriacao;
        private $revisoes = [];

        public function __get($attr) {
            return $this->$attr;
        }

        public function __set($attr, $vlr) {
            $this->$attr = $vlr;
            return $this;
        }

        public function setRevisao($r1 = '', $r7 = '', $r30 = '', $r60 = '') {
            $this->revisoes[] = 0;
            $this->revisoes[] = $r1;
            $this->revisoes[] = $r7;
            $this->revisoes[] = $r30;
            $this->revisoes[] = $r60;
        }
    }

?>