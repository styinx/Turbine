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
			$this->text = new ForumTextWrapper();

			$this->setUp(true);
		}

		public function showMainPage()
		{
			$text = "";

			for($i = 0; $i < 3; $i++)
			{
				$text = $this->text->getSection();
			}

			return $text;
		}

		public function showTopicPage()
		{

		}

		public function showEntryPage()
		{

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
				require_once(dirname(__FILE__) . "/../../include/lib/db/default_forum.php");

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
		private $user_name			= "";

		public function __construct()
		{

		}
	}

	class Section
	{
		private $section_id			= 0;
		private $section_name		= "";

		public function __construct()
		{

		}
	}

	class SubSection
	{
		private $sub_section_id		= 0;
		private $sub_section_name 	= "";

		public function __construct()
		{

		}
	}

	class Topic
	{
		private $topic_id			= 0;
		private $topic_name			= "";

		public function __construct()
		{

		}
	}

	class Entry
	{
		private $topic_id			= 0;
		private $topc_name			= "";

		public function __construct()
		{

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