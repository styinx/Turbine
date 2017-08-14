<?php

	require_once(dirname(__FILE__) . "/../../include/lib/db/database.php");
	require_once(dirname(__FILE__) . "/../../include/lib/html/html.php");

	class Forum
	{
		private $forum_name		= "";
		private $db				= null;
		private $text			= null;
		private $db_info		= array	(
											"db_host"	=> "localhost",
											"db_user"	=> "root",
											"db_pw"		=> "root",
											"db_name"	=> "forum_name"
										);

		public function __construct($forum_name)
		{
			$this->forum_name = $forum_name;
			$this->db_info["db_name"] = $forum_name;

			$this->db = new DB($this->db_info["db_host"], $this->db_info["db_user"],
							   $this->db_info["db_pw"]);

			//$this->setUp(false);
		}

		public function showMainPage()
		{
			$text = "";

			$this->db->selectDatabase($this->db_info["db_name"]);
			$sections = $this->db->query("SELECT * FROM section");

			foreach($sections as $section)
			{
				$sec = new Section($this->db, $section["id"]);
				$text .= "<div class='section'>";
				$text .= $sec->printSectionHTML();

				$subsections = $this->db->query("SELECT * FROM sub_section WHERE id = '" . $section["id"] . "'");
				foreach($subsections as $subsection)
				{
					$sub = new Subsection($this->db, $subsection["id"]);
					$text .= $sub->printSubsectionHTML();
				}
				$text .= "</div>";
			}

			return $text;
		}

		public function showTopicPage($section, $id)
		{
			$text = "";

			$this->db->selectDatabase($this->db_info["db_name"]);

			$sec = new Section($this->db, $section);
			$text .= "<div class='section'>";
			$text .= $sec->printSectionHTML();

			$subsections = $this->db->query("SELECT * FROM sub_section WHERE id = '" . $section . "'");
			foreach($subsections as $subsection)
			{
				$sub = new Subsection($this->db, $subsection["id"]);
				$text .= $sub->printSubsectionHTML();
			}
			$text .= "</div>";
			$text .= "<div class='subsection'>";

			$topics = $this->db->query("SELECT * FROM topic WHERE subsection = '" . $id . "'");

			foreach($topics as $topic)
			{
				$top = new Topic($this->db, $topic["id"]);
				$text .= $top->printTopicHTML();
			}
			$text .= "</div>";

			return $text;
		}

		public function showEntryPage($section, $subsection, $id)
		{
			$text = "";

			$this->db->selectDatabase($this->db_info["db_name"]);

			$top = new Topic($this->db, $id);
			$entries = $this->db->query("SELECT * FROM entry WHERE topic = '" . $id . "'");

			$text .= "<div class='topic'>";
			$text .= "<h1>" . $top->getName() . "</h1>";

			foreach($entries as $entry)
			{
				$ent = new Entry($this->db, $entry["id"]);
				$text .= $ent->printEntryHTML();
			}
			$text .= "</div>";


			return $text;
		}

		public function setUp($reset = false)
		{
			if($reset)
			{
				$this->db->dropDatabase($this->forum_name);
				$this->db->createDatabase($this->forum_name);
			}
			if($this->db->selectDatabase($this->forum_name))
			{
				require_once(dirname(__FILE__) . "/../db/default_forum.php");

				foreach($DB_DEFAULT as $table => $vals)
				{
					$this->db->createTable($table, 	$DB_DEFAULT[$table][0], $DB_DEFAULT[$table][1],
													$DB_DEFAULT[$table][2], $DB_DEFAULT[$table][3],
													$DB_DEFAULT[$table][4], $DB_DEFAULT[$table][5]);
				}
			}
			else
			{
				$this->db->createDatabase($this->forum_name);
				$this->setUp($reset);
			}
		}

		public function __destruct()
		{

		}
	}

	class User
	{
        private $id     	= 0;
		private $name		= "";
		private $email		= 0;
		private $entries	= 0;
		private $topics		= 0;
		private $comments	= 0;

		public function __construct()
		{

		}
	}

	class Section
	{
		private	$db			= null;
		private $id			= 0;
		private $name		= "";

		public function __construct($db, $id)
		{
			$this->db = $db;
			$this->id = $id;

			$section = $this->db->singleQueryResult("SELECT * FROM section WHERE id = '" . $this->id . "'");
			$this->name = $section["name"];
		}

		public function printSectionHTML()
		{
			$text = ""
				. "<div class='head'>"
					. "<table>"
						. "<tr>"
							. "<td>"
								. "<span id='heading'>" . $this->name . "</span>"
							. "</td>"
						. "</tr>"
					. "</table>"
				. "</div>";

			return $text;
		}
	}

	class SubSection
	{
		private	$db			= null;
		private $id			= 0;
		private $name		= "";
		private $description= "";
		private $section	= 0;

		public function __construct($db, $id)
		{
			$this->db = $db;
			$this->id = $id;

			$sub = $this->db->singleQueryResult("SELECT * FROM sub_section WHERE id = '" . $this->id . "'");
			$this->name = $sub["name"];
			$this->section = $sub["section"];
		}

		public function printSubSectionHTML()
		{
			$text = ""
				. "<div class='section-entry'>"
					. "<a href='collection/forum/subsection.html?section=" . $this->section . "&subsection=" . $this->id . "'>"
						. "<div class='body'>"
							. "<table>"
								. "<tr>"
									. "<td>"
										. "<a id='heading' href='collection/forum/subsection.html?section=" . $this->section . "&subsection=" . $this->id . "'>" . $this->name . "</a>"
									. "</td>"
									. "<td>"
										. "<span id='header'>" . "100" . "</span>"
									. "</td>"
									. "<td>"
										. "<span id='content'>" . "100" . "</span><br>"
										. "<span id='content'>" . "100" . "</span><br>"
									. "</td>"
								. "</tr>"
							. "</table>"
						. "</div>"
					. "</a>"
				. "</div>";
			return $text;
		}
	}

	class Topic
	{
		private	$db			= null;
		private $id			= 0;
		private $name		= "";
		private $section	= 0;
		private $subsection	= 0;

		public function __construct($db, $id)
		{
			$this->db = $db;
			$this->id = $id;
			$top = $this->db->singleQueryResult("SELECT * FROM topic WHERE id = '" . $this->id . "'");
			$this->name = $top["name"];
			$this->section = $top["section"];
			$this->subsection = $top["subsection"];
		}

		public function getName()
		{
			return $this->name;
		}

		public function printTopicHTML()
		{
			$text = ""
				. "<div class='subsection-entry'>"
					. "<a href='collection/forum/topic.html?section=" . $this->section . "&subsection=" . $this->subsection . "&topic=" . $this->id . "'>"
						. "<div class='body'>"
							. "<table>"
								. "<tr>"
									. "<td>"
										. "<a id='heading' href='collection/forum/topic.html?section=" . $this->section . "&subsection=" . $this->subsection . "&topic=" . $this->id . "'>"
											. $this->name
										. "</a>"
									. "</td>"
									. "<td>"
										. "<span id='header'>" . "asd" . "</span>"
									. "</td>"
									. "<td>"
										. "<span id='content'>" . "asd" . "</span><br>"
										. "<span id='content'>" . "asd" . "</span><br>"
									. "</td>"
								. "</tr>"
							. "</table>"
						. "</div>"
					. "</a>"
				. "</div>";

			return $text;
		}
	}

	class Entry
	{
		private	$db			= null;
		private $id			= 0;
		private $content	= "";
		private $user		= 0;
		private $section	= 0;
		private $subsection	= 0;
		private $topic		= 0;

		public function __construct($db, $id)
		{
			$this->db = $db;
			$this->id = $id;
		}

		public function printEntryHTML()
		{
			$text = ""
				. "<div class='topic-entry-wrapper'>"
					. "<div class='topic-entry'>"
						. "<p id='text'>" . "asd" . "</p>"
						. "<p id='author'>" . "asd" . "</p>"
						. "<p id='time'>" . "asd" . "</p>"
					. "</div>"
					. "<div class='entry'>"
						. "<div class='entry-entry'>"
							. "<p id='text'>" . "asd" . "</p>"
							. "<p id='author'>" . "asd" . "</p>"
							. "<p id='time'>" . "asd" . "</p>"
						. "</div>"
					. "</div>"
					. "<div class='entry'>"
						. "<div class='entry-entry'>"
							. "<p id='text'>" . "asd" . "</p>"
							. "<p id='author'>" . "asd" . "</p>"
							. "<p id='time'>" . "asd" . "</p>"
						. "</div>"
					. "</div>"
					. "<div class='topic-entry-subbar'>"
						. "<button>comment</button>"
					. "</div>"
				. "</div>";

			return $text;
		}
	}

	class ForumTextWrapper
	{
		private $html = null;

		public function __construct()
		{
			$this->html = new HTML();
		}

		public function getSubsection()
		{

		}

		public function getSection()
		{
			$text = ""
			. "<div class='section'>"
				. "asdasd"
				//. $this->html->table(null, array("General"))
			. "</div>";
			return $text;
		}
	}
?>
