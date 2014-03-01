<?php
/**
 * undocumented class
 *
 * @package default
 * @author Me
 **/
interface IUser
{
    function getName();
}

class User implements IUser
{
    public function __construct($id)
    {

    }

    public function getName()
    {
        return "Mtao";
    }
}

class UserFactory
{
    public static function Create($id)
    {
        return new User($id);
    }
}

$uo = UserFactory::Create(1);
echo ($uo->getName());
?>
